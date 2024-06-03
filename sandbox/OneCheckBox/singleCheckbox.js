document.addEventListener('DOMContentLoaded', (event) => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"][name="option"]');
  
  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
          if (this.checked) {
              checkboxes.forEach(box => {
                  if (box !== this) {
                      box.checked = false;
                  }
              });
          }
      });
  });
});
