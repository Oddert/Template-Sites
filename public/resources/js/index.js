
const allSites = document.querySelectorAll('.site')

const detailsWindow = document.querySelector('.details_window__container')
const detailsWindowButton = detailsWindow.querySelector('.details_window--close')
const detailsWindowTitle = detailsWindow.querySelector('.details_window__title')
const detailsWindowDescription = detailsWindow.querySelector('.details_window__description')
const detailsWindowImage = detailsWindow.querySelector('.details_window__image')

let sites = []

fetch(`/api/sites`)
  .then(res => res.json())
  .then(res => sites = res.sites)

function handleDetails (e) {
  e.preventDefault()
  const pathList = Array.from(e.path)
  const filteredPathList = pathList.filter(each => {
    let thisClassList = Array.from(each.classList || []) || []
    return thisClassList.includes('site')
  })
  const containerElement = filteredPathList[0]
  updatedetailsWindow(containerElement.dataset.id)
  e.stopPropagation()
}

function updatedetailsWindow (site) {
  let filteredSites = sites.filter(e => e._id === site)
  let targetSite = filteredSites[0]
  detailsWindowTitle.textContent = targetSite.title
  detailsWindowDescription.textContent = targetSite.description
  detailsWindowImage.src = targetSite.thumbnail
  console.log(targetSite)
  toggledetailsWindow (null, true)
}

function toggledetailsWindow (e, open=false) {
  if (open) detailsWindow.classList.remove('no_show')
  else detailsWindow.classList.add('no_show')
}

allSites.forEach(each =>
  each.addEventListener('click', handleDetails, {
    capture: true
  })
)
detailsWindowButton.onclick = toggledetailsWindow
