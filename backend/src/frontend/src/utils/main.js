export function toggleContent(targetId) {
  const contents = document.querySelectorAll('.description');
  contents.forEach(content => content.style.display = 'none');
  const targetContent = document.getElementById(targetId);
  if (targetContent) {
      targetContent.style.display = 'block';
  } else {
      targetContent.style.display = 'none';
  }
}