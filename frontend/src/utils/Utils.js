const renderLoading = (button, isLoading, textButton) => {
  if (isLoading) {
    button.setAttribute('disabled', true);
    /* eslint-disable no-param-reassign */
    button.textContent = textButton;
  } else {
    button.removeAttribute('disabled');
    /* eslint-disable no-param-reassign */
    button.textContent = textButton;
  }
};

export default renderLoading;
