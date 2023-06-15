async function logout(){
    window.location.href="/home/logout"
}

document.getElementById("logout").addEventListener("click",logout)

async function getApi() {
    let res = await axios.get("https://news-utd-app.onrender.com/home/apiKey")
    res = res.data
    console.log(res)
    document.getElementById("topusername").innerHTML = res.username
    document.getElementById("middleusername").innerHTML = res.username
    if (res.success) {
        document.getElementById("generateAPIKey").style.display = "none"
        document.getElementById("apiKey").innerHTML = res.apiKey
    } else {
        document.getElementById("apiKeyBox").style.display = "none"
        document.getElementById("generateAPIKey").addEventListener("click", async (e) => {
            e.preventDefault()
            let res = await axios.get("https://news-utd-app.onrender.com/home/newApiKey")
            res = res.data
            if (res.success) {
                document.getElementById("generateAPIKey").style.display = "none"
                document.getElementById("apiKey").innerHTML = res.apiKey
                document.getElementById("apiKeyBox").style.display = "flex"
            }
        })
    }
}

getApi()

function copyToClipboard(textSelector) {
    const textToCopy = document.querySelector(textSelector);
    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(textToCopy);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');
    selection.removeAllRanges();

    alert('Text copied: ' + textToCopy.textContent);
}
document.querySelector('.button').addEventListener('click', function () {
    copyToClipboard('#apiKey');
});
