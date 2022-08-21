// непосредственно очищение комментов
function onUpdateComments() {
    chrome.storage.local.get(['userIds'], function(result) {

        let userIds = [];
        if ('userIds' in result) {
            for(let i=0;i<result.userIds.length;i++) {
                if (result.userIds[i][0] === '[') {
                    userIds[i] = result.userIds[i];
                } else {
                    userIds[i] = `/users/${result.userIds[i]}`;
                }

            }
        } else {
            return false;
        }

        $('.cs-comment-item__author').each(function() {
            const authorName = '['+$(this).children('.cs-comment-item__author-name').text()+']';
            console.log(authorName);
            console.log(userIds.indexOf(authorName));
            if (userIds.indexOf($(this).attr('href')) !== -1 || userIds.indexOf(authorName) !== -1) {
                $(this).parent('div').parent('.cs-comment-item__wrap').html('<i>Комментарий скрыт расширением</i>');
            }
        });
    });
}


/*

Отслеживанием изменения в комментариях (первоначальная загрузка комментариев, загрузка по кнопке "загрузить ещё" и пр.)

 */
let observer = new MutationObserver(onUpdateComments);
const commentsNode = document.querySelector('.cs-comments');

const observerConfig = {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true
};


let isSetObserver = false;

document.addEventListener('DOMSubtreeModified', () => {
    if((!isSetObserver) && (document.querySelector('.cs-comments') != null)) {
        isSetObserver = true;
        observer.observe(document.querySelector('.cs-comments'), observerConfig);
    }
});

/*

А тут работаем с уведомлениями

 */

function onUpdateNotifications() {
    const counterNode = $('.actionCounter_b19ez');
    chrome.storage.local.get(['userIds'], function(result) {
        let userIds = result.userIds;
        $('.menuOverlayInner_qiTn9 li').each(function() {
            if (userIds.indexOf($(this).find('b').text()) !== -1) {

                //уменьшаем или удаляем счетчик непрочитанных уведомлений
                if ($(this).children('div')[0].className.indexOf('itemNew_W2sJs') !== -1) {
                    const counter = counterNode.text();
                    if (counter === '1') {
                        counterNode.remove();
                    } else {
                        counterNode.text(counter -1);
                    }
                }
                $(this).remove();
            }
        });
    });
}

let notificationsObserver = new MutationObserver(onUpdateNotifications);
notificationsObserver.observe(document.querySelector('.menuOverlayInner_qiTn9'), observerConfig);
//onUpdateNotifications();

