// 모달 관련 요소 가져오기
var modal = document.getElementById("signupModal");
var btn = document.getElementById("signupBtn");
var span = document.getElementsByClassName("close")[0];

// 회원가입 버튼을 클릭하면 모달 열기
if (btn) {
  btn.onclick = function() {
    modal.style.display = "flex";  // 모달 창 열기
  }
}

// 닫기(X) 버튼을 클릭하면 모달 닫기
if (span) {
  span.onclick = function() {
    modal.style.display = "none";
  }
}

// 모달 바깥 부분을 클릭하면 모달 닫기
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// 알림 창 토글 함수
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

  // 새로운 알림 아이템 생성
  var newAlert = document.createElement('div');
  newAlert.classList.add('notification-item');
  newAlert.innerHTML = `<p>${message}</p>`;
  alertList.insertBefore(newAlert, alertList.firstChild);
}

// 초기 알림 메시지 추가 (테스트용)
addNotification('이것은 테스트 알림입니다.');
addNotification('실시간 알림을 여기에 추가할 수 있습니다.');

// 클릭 시 알림 창 닫기
window.addEventListener('click', function(event) {
  var notificationList = document.querySelector('.notification-list');
  if (notificationList && !notificationList.contains(event.target) && !event.target.matches('.bell-icon')) {
    notificationList.classList.remove('show');
  }
});
