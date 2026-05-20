const pendingTableBody = document.querySelector("#pendingTableBody");
const reviewModalEl = document.querySelector("#reviewDetailModal");
const reviewModal = reviewModalEl ? new bootstrap.Modal(reviewModalEl) : null;
const modalUsername = document.querySelector("#modalUsername");
const modalFullname = document.querySelector("#modalFullname");
const modalRole = document.querySelector("#modalRole");
const modalQuestionRecord = document.querySelector("#modalQuestionRecord");
const approveFromModalBtn = document.querySelector("#approveFromModalBtn");
let currentPendingUsername = null;

const escapeCssSelector = value => {
    if (window.CSS && CSS.escape) {
        return CSS.escape(value);
    }
    return value.replace(/(["'\\#.:;,\[\]<>~+*^$|=\/])/g, "\\$1");
};

const showError = message => {
    if (!message) return;
    alert(message);
};

const updateMainUserStatus = username => {
    if (!username) return;
    const escaped = escapeCssSelector(username);
    const userRow = document.querySelector(`#userTableBody tr[data-username="${escaped}"]`);
    if (!userRow) return;
    const statusCell = userRow.querySelector("td:nth-child(4)");
    if (statusCell) {
        statusCell.innerHTML = '<span class="badge bg-success">Hoạt động</span>';
    }
};

const removePendingRow = username => {
    if (!username) return;
    const escaped = escapeCssSelector(username);
    const pendingRow = document.querySelector(`#pendingTableBody tr[data-username="${escaped}"]`);
    if (pendingRow) {
        pendingRow.remove();
    }

    const remainingRows = pendingTableBody.querySelectorAll("tr");
    if (remainingRows.length === 0) {
        pendingTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted py-4">
                    Hiện chưa có hồ sơ chờ xét duyệt.
                </td>
            </tr>
        `;
    }
};

const setModalContent = user => {
    if (!user) return;
    currentPendingUsername = user.username;
    modalUsername.textContent = user.username || "-";
    modalFullname.textContent = user.fullname || "Chưa cập nhật";
    modalRole.textContent = user.role || "user";
    modalQuestionRecord.textContent = user.questionrecord || "Chưa có thông tin trả lời.";
    if (approveFromModalBtn) {
        approveFromModalBtn.dataset.username = user.username;
    }
};

const fetchPendingDetails = async username => {
    if (!username) return null;
    try {
        const response = await fetch(`/admin/users/pending/${encodeURIComponent(username)}`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            showError(errorData?.message || "Không thể tải hồ sơ xét duyệt.");
            return null;
        }

        const data = await response.json();
        return data.user || null;
    } catch (error) {
        console.error(error);
        showError("Lỗi kết nối khi tải hồ sơ xét duyệt.");
        return null;
    }
};

const approveUser = async username => {
    if (!username) return false;
    try {
        const response = await fetch("/admin/users/approve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username })
        });

        const data = await response.json();
        if (!response.ok || data.data !== "success") {
            showError(data.message || "Duyệt thành viên không thành công.");
            return false;
        }

        return true;
    } catch (error) {
        console.error(error);
        showError("Lỗi máy chủ khi duyệt thành viên.");
        return false;
    }
};

const showReviewModal = async username => {
    const user = await fetchPendingDetails(username);
    if (!user) return;
    setModalContent(user);
    if (reviewModal) {
        reviewModal.show();
    }
};

const handleActionClick = async event => {
    const viewButton = event.target.closest(".view-review-btn");
    if (viewButton) {
        event.preventDefault();
        const username = viewButton.dataset.username;
        await showReviewModal(username);
        return;
    }

    const approveButton = event.target.closest(".approve-user-btn");
    if (approveButton) {
        event.preventDefault();
        const username = approveButton.dataset.username;
        const confirmed = window.confirm(`Bạn có chắc muốn duyệt tài khoản ${username}?`);
        if (!confirmed) return;

        const success = await approveUser(username);
        if (success) {
            removePendingRow(username);
            updateMainUserStatus(username);
            alert("Đã duyệt thành viên thành công.");
        }
    }
};

const handleApproveFromModal = async () => {
    const username = approveFromModalBtn?.dataset.username;
    if (!username) return;
    const confirmed = window.confirm(`Duyệt tài khoản ${username} từ cửa sổ xem chi tiết?`);
    if (!confirmed) return;

    const success = await approveUser(username);
    if (success) {
        if (reviewModal) {
            reviewModal.hide();
        }
        removePendingRow(username);
        updateMainUserStatus(username);
        alert("Đã duyệt thành viên thành công.");
    }
};

if (pendingTableBody) {
    pendingTableBody.addEventListener("click", handleActionClick);
}

if (approveFromModalBtn) {
    approveFromModalBtn.addEventListener("click", handleApproveFromModal);
}
