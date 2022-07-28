const resetForm = (e) => {
  // e.preventDefault();
  // console.log(e.target);

  const form = e.target;

  // let colorPicker = form.querySelector('.color-picker')
  // colorPicker.dataset.color = '#696969'
  // colorPicker.dataset.label = 'Dim Gray'
  // form.querySelector('.switch-wrapper').dataset.switched = false

  // remove modal
  form.parentElement.remove();
};

export default resetForm;
