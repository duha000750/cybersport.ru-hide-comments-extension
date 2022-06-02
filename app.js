
function run() {
    chrome.storage.local.get(['userIds'], function(result) {

        let userIds = [];
        if ('userIds' in result) {
            for(let i=0;i<result.userIds.length;i++) {
                userIds[i] = `/users/${result.userIds[i]}`;
            }
        } else {
            return false;
        }
        console.log(userIds);

        $('.cs-comment-item__author').each(function() {
            console.log(userIds, $(this).attr('href'));
            if (userIds.indexOf($(this).attr('href')) !== -1) {
                $(this).parent('div').parent('.cs-comment-item__wrap').html('<i>Комментарий скрыт расширением</i>');
            }

        });
    });
}

let checkedCommentsBlock = false;
document.addEventListener('DOMSubtreeModified', () => {
    if ($('.cs-comment-item__author:not(._loading)').length && (!checkedCommentsBlock)) {
        checkedCommentsBlock = true;
        console.log('run!');
        run();
    } else if((!$('.cs-comment-item__author:not(._loading)').length) && checkedCommentsBlock) {
        checkedCommentsBlock = false;
    }
})
