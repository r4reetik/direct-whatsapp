document.getElementById("inputPhn").addEventListener("input", () => {
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
            url += "?text=" + document.getElementById("inputMsg").value.toString();
        }
        window.open(url);
    } else {
        e.preventDefault();
    }
});
