window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function toggleNotification() {
  var notificationList = document.querySelector('.notification-list');
  if (notificationList) {
    notificationList.classList.toggle('show');
  }
}

// 알림 추가 함수 (나중에 서버 데이터로 대체 가능)
function addNotification(message) {
  var alertList = document.getElementById('notification-list');
  var emptyNotification = document.querySelector('.empty-notification');

  // 새로운 알림이 추가되면 "새로운 알림이 없습니다." 문구 제거
  if (emptyNotification) {
    emptyNotification.style.display = 'none';
  }


  var newAlert = document.createElement('div');
  newAlert.classList.add('notification-item');
  newAlert.innerHTML = `<p>${message}</p>`;
  alertList.insertBefore(newAlert, alertList.firstChild);
}

// 초기 알림 메시지 추가 (테스트용)
addNotification('이것은 테스트 알림입니다.');
addNotification('실시간 알림을 여기에 추가할 수 있습니다.');


window.addEventListener('click', function(event) {
  var notificationList = document.querySelector('.notification-list');
  if (notificationList && !notificationList.contains(event.target) && !event.target.matches('.bell-icon')) {
    notificationList.classList.remove('show');
  }
});
