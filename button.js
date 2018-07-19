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

const repos = [
  { name: 'hip-new', domain: 'www-hip-new' },
  { name: 'hip-microapp-directory', domain: 'hip-microapp-directory' },
  { name: 'hip-message-service', domain: 'hip-message-service' },
  { name: 'platform-search-service', domain: 'platform-search-service' },
  { name: 'lectio', domain: 'lectio' },
  { name: 'getquote.com.au', domain: 'getquote.com.au' },
  { name: 'socium', domain: 'socium' },
  { name: 'opus', domain: 'opus' },
  { name: 'conmendator', domain: 'conmendator' }
];

function findDomain() {
  const repo = repos.find(repo => location.pathname.includes(repo.name));

  if (repo) {
    return repo.domain;
  }
}

const domain = findDomain();
const isHipNew = domain === 'www-hip-new';

function renderButtons(parent, branch) {
  if (isHipNew) {
    const dubdubdub = `<a href="https://${branch}-${domain}.k8s.hipages.com.au/" class="btn btn-outline btn-sm border-blue">Preview www</a>`;
    const admin = `<a href="https://${branch}-admin-hip-new.k8s.hipages.com.au/" style="margin-left:5px" class="btn btn-outline btn-sm border-blue">Preview admin</a>`;
    parent.append(dubdubdub);
    parent.append(admin);
  } else {
    const dubdubdub = `<a href="https://${branch}-${domain}.k8s.hipages.com.au/" class="btn btn-outline btn-sm border-blue">View staging branch</a>`;
    parent.append(dubdubdub);
  }
}

function findAndRender() {
  // Only run on selected repos;
  if (!repos.find(repo => location.pathname.indexOf(repo.name) > -1)) {
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
