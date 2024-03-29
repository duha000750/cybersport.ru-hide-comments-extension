function ready() {
    document.querySelector('#form').onsubmit = function(e) {
        e.preventDefault();
        const text = document.querySelector('#links-ta').value;
        const links = text.split("\n");
        let userIds = [];

        links.forEach((link) => {
            if (link.length > 0) {
                if (id[0] !== '[') {
                    const arr = link.split('/');
                    userIds.push(arr[arr.length - 1]);
                } else {
                    userIds.push(link);
                }
            }

        });
        chrome.storage.local.set({userIds: userIds}, function() {});
    }

    let text = '';
    chrome.storage.local.get(['userIds'], function(result) {
        if ('userIds' in result) {
            const userIds = result.userIds;
            userIds.forEach((id) => {
                if (id[0] !== '[') {
                    text += `https://www.cybersport.ru/users/${id}\n`;
                } else {
                    text += id+"\n";
                }
            });
            document.querySelector('#links-ta').value = text;
        }
    });


}

document.addEventListener('DOMContentLoaded', ready);
