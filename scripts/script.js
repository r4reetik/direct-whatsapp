document.getElementById("inputPhn").addEventListener("input", () => {
    if (document.getElementById("inputPhn").value.toString().charAt(0) === "0") {
        document.getElementById("inputPhn").value = document
            .getElementById("inputPhn")
            .value.substring(1)
            .toString();
    }
    document.getElementById("inputPhn").value = document
        .getElementById("inputPhn")
        .value.replace(/[^0-9]/gi, "")
        .substring(0, 10)
        .toString();
});

document.getElementById("btnSend").addEventListener("click", (e) => {
    if (document.getElementById("inputPhn").value.length === 10) {
        let url = "https://wa.me/91" + document.getElementById("inputPhn").value.toString();
        if (document.getElementById("inputMsg").value != "") {
            url +=
                "?text=" + encodeURIComponent(document.getElementById("inputMsg").value.toString());
        }
        if (localStorage.getItem("storedRepNums")) {
            let updatedRepNums = JSON.parse(localStorage.getItem("storedRepNums"));
            updatedRepNums.unshift(document.getElementById("inputPhn").value.toString());
            localStorage.setItem("storedRepNums", JSON.stringify([...new Set(updatedRepNums)]));
            updateRecentList();
        } else {
            let updatedRepNums = [document.getElementById("inputPhn").value.toString()];
            localStorage.setItem("storedRepNums", JSON.stringify(updatedRepNums));
            updateRecentList();
        }
        window.open(url);
        if (document.getElementById("toggleClearBoth").checked) {
            document.getElementById("inputMsg").value = "";
            document.getElementById("inputPhn").value = "";
        } else if (document.getElementById("toggleClearMsg").checked) {
            document.getElementById("inputMsg").value = "";
        } else if (document.getElementById("toggleClearNum").checked) {
            document.getElementById("inputPhn").value = "";
        }
    } else {
        e.preventDefault();
    }
});

document.getElementById("btnClearStorage").addEventListener("click", () => {
    if (localStorage.getItem("storedRepNums")) {
        localStorage.removeItem("storedRepNums");
        document.getElementById("recentList").innerHTML = `Recents data cleared successfully!`;
        document.getElementById("recentList").classList.remove("m-n3");
    } else {
        updateRecentList();
    }
});

const updateRecentList = () => {
    if (localStorage.getItem("storedRepNums")) {
        document.getElementById("recentList").innerHTML = "";
        document.getElementById("recentList").classList.add("m-n3");
        let repNums = JSON.parse(localStorage.getItem("storedRepNums"));
        repNums.forEach((repNum) => {
            document
                .getElementById("recentList")
                .insertAdjacentHTML(
                    "beforeend",
                    `<li class="list-group-item pointer">` + repNum + `</li>`
                );
        });
        let repNumList = document.querySelectorAll("#recentList > li");
        repNumList.forEach((repNum) => {
            repNum.addEventListener("click", () => {
                document.getElementById("inputPhn").value = repNum.innerText;
                document.getElementById("btnSend").click();
            });
        });
    } else {
        document.getElementById(
            "recentList"
        ).innerHTML = `Pardon, recipient didn't receive any message from your side ;(
                    <br />
                    Oh! You didn't send one?`;
        document.getElementById("recentList").classList.remove("m-n3");
    }
};
updateRecentList();

const loadSavedSettings = () => {
    if (localStorage.getItem("toggleClearBothS") === "true") {
        document.getElementById("toggleClearBoth").checked = true;
    } else {
        document.getElementById("toggleClearBoth").checked = false;
    }
    if (localStorage.getItem("toggleClearMsgS") === "true") {
        document.getElementById("toggleClearMsg").checked = true;
    } else {
        document.getElementById("toggleClearMsg").checked = false;
    }
    if (localStorage.getItem("toggleClearNumS") === "true") {
        document.getElementById("toggleClearNum").checked = true;
    } else {
        document.getElementById("toggleClearNum").checked = false;
    }
};

document.getElementById("btnSettings").addEventListener("click", loadSavedSettings);

document.getElementById("toggleClearBoth").addEventListener("click", () => {
    if (document.getElementById("toggleClearBoth").checked) {
        document.getElementById("toggleClearMsg").checked = true;
        document.getElementById("toggleClearNum").checked = true;
    } else {
        document.getElementById("toggleClearMsg").checked = false;
        document.getElementById("toggleClearNum").checked = false;
    }
});

document.getElementById("toggleClearMsg").addEventListener("click", () => {
    if (
        document.getElementById("toggleClearMsg").checked &&
        document.getElementById("toggleClearNum").checked
    ) {
        document.getElementById("toggleClearBoth").checked = true;
    } else {
        document.getElementById("toggleClearBoth").checked = false;
    }
});

document.getElementById("toggleClearNum").addEventListener("click", () => {
    if (
        document.getElementById("toggleClearNum").checked &&
        document.getElementById("toggleClearMsg").checked
    ) {
        document.getElementById("toggleClearBoth").checked = true;
    } else {
        document.getElementById("toggleClearBoth").checked = false;
    }
});

document.getElementById("btnSaveSettings").addEventListener("click", () => {
    if (document.getElementById("toggleClearBoth").checked) {
        localStorage.setItem("toggleClearBothS", "true");
    } else {
        localStorage.setItem("toggleClearBothS", "false");
    }
    if (document.getElementById("toggleClearMsg").checked) {
        localStorage.setItem("toggleClearMsgS", "true");
    } else {
        localStorage.setItem("toggleClearMsgS", "false");
    }
    if (document.getElementById("toggleClearNum").checked) {
        localStorage.setItem("toggleClearNumS", "true");
    } else {
        localStorage.setItem("toggleClearNumS", "false");
    }
});

document.getElementById("btnReset").addEventListener("click", () => {
    document.getElementById("inputMsg").value = "";
    document.getElementById("inputPhn").value = "";
    localStorage.clear();
    updateRecentList();
});
