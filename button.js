function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
    .replace(/_/g, '-');
}

const repos = ['hip-new'];

function renderButtons(parent, branch) {
  const dubdubdub = `
<a href="https://${branch}-www-hip-new.k8s.hipages.com.au/" class="btn btn-outline btn-sm border-blue">
      Preview www
  </a>`;
  const admin = `<a href="https://${branch}-admin-hip-new.k8s.hipages.com.au/" style="margin-left:5px" class="btn btn-outline btn-sm border-blue">
      Preview admin
  </a>`;
  parent.append(dubdubdub);
  parent.append(admin);
}

function findAndRender() {
 // Only run on selected repos;
  if (!repos.find(repo => location.pathname.indexOf(repo) > -1)) {
    return false;
  }

  // PR view  
  if (location.pathname.indexOf('pull') > -1) {
    const branch = slugify($('.head-ref span').text());
    console.log(branch);
    const parent = $('.tabnav-tabs');
    renderButtons(parent, branch);
  } else {
    // Branch view
    const branch = slugify($('[data-hotkey="w"] span').text());
    const parent = $('.file-navigation');
    renderButtons(parent, branch);
  }
}

$(document).on('pjax:end', () => {
  findAndRender();
});
findAndRender();
