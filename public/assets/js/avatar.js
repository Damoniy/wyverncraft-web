function setAvatar() {
    base64String = localStorage.getItem('avatar')
    document.getElementById('avatar').src = 'data:image/png;base64,' + base64String;
  }

  setAvatar()