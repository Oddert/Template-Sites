
const allSites = document.querySelectorAll('.site')

const detailsWindow = document.querySelector('.details_window__container')
const detailWindowButton = detailsWindow.querySelector('.details_window--close')
const detailWindowTitle = detailsWindow.querySelector('.details_window__title')
const detailsWindowDescription = detailsWindow.querySelector('.details_window__description')

let sites = []

fetch(`/api/sites`)
  .then(res => res.json())
  .then(res => sites = res.sites)

function handleDetails (e) {
  e.preventDefault()
  let pathList = Array.from(e.path)
  let filteredPathList = pathList.filter(each => {
    let thisClassList = Array.from(each.classList || []) || []
    return thisClassList.includes('site')
  })
  let containerElement = filteredPathList[0]
  updateDetailWindow(containerElement.dataset.id)
  console.log(containerElement)
  // console.log(container)
  // console.log(container.dataset.id)
  // fetch(`/api/site/${container.dataset.id}`)
  // .then(res => res.json())
  // .then(res => console.log(res))

  e.stopPropagation()
}

function updateDetailWindow (site) {
  let filteredSites = sites.filter(e => e._id === site)
  let targetSite = filteredSites[0]
  detailWindowTitle.textContent = targetSite.title
  detailsWindowDescription.textContent = targetSite.description
  console.log(targetSite)
  toggleDetailWindow (null, true)
}

function toggleDetailWindow (e, open=false) {
  console.log(open)
  if (open) {
    detailsWindow.classList.remove('no_show')
  } else {
    detailsWindow.classList.add('no_show')
  }
}

allSites.forEach(each =>
  each.addEventListener('click', handleDetails, {
    capture: true
  })
)
detailWindowButton.onclick = toggleDetailWindow
