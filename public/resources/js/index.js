
const allSites = document.querySelectorAll('.site')

const detailsWindow               = document.querySelector('.details_window__container')
const detailsWindowButton         = detailsWindow.querySelector('.details_window--close')
const detailsWindowTitle          = detailsWindow.querySelector('.details_window__title')
const detailsWindowTitleText      = detailsWindowTitle.querySelector('.details_window__title--text')
const detailsWindowSubtitle       = detailsWindow.querySelector('.details_window__desc--subtitle')
const detailsWindowDescription    = detailsWindow.querySelector('.details_window__desc--description')
const detailsWindowImageLink      = detailsWindow.querySelector('.details_window__image--link')
const detailsWindowImage          = detailsWindow.querySelector('.details_window__image')
const detailsWindowLink           = detailsWindow.querySelector('.details_window__link a')
const detailsWindowLinkText       = detailsWindow.querySelector('.details_window__link a p')
const detailsWindowTable          = detailsWindow.querySelector('.details_window__table')
const detailsWindowTableType      = detailsWindowTable.querySelector('.details_window__table--type')
const detailsWindowTableDate      = detailsWindowTable.querySelector('.details_window__table--date')
const detailsWindowTablePurpose   = detailsWindowTable.querySelector('.details_window__table--purpose')
const detailsWindowTablePages     = detailsWindowTable.querySelector('.details_window__table--pages')
const detailsWindowTablePotential = detailsWindowTable.querySelector('.details_window__table--potential')

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
  detailsWindowTitle.href                 = targetSite.local ? targetSite.onsiteURL : targetSite.offsiteURL
  detailsWindowImageLink.href             = targetSite.local ? targetSite.onsiteURL : targetSite.offsiteURL
  detailsWindowTitleText.textContent      = targetSite.title
  detailsWindowSubtitle.textContent       = targetSite.subtitle
  detailsWindowDescription.textContent    = targetSite.description
  detailsWindowImage.src                  = targetSite.thumbnail || "https://static.umotive.com/img/product_image_thumbnail_placeholder.png"
  detailsWindowLink.href                  = targetSite.local ? targetSite.onsiteURL : targetSite.offsiteURL
  detailsWindowLinkText.textContent       = targetSite.local ? targetSite.onsiteURL : targetSite.offsiteURL

  detailsWindowTableType.textContent      = targetSite.type || "undefined"
  detailsWindowTableDate.textContent      = targetSite.date || "--:--:--"
  detailsWindowTablePurpose.textContent   = targetSite.madefor || "not specified"
  detailsWindowTablePages.textContent     = targetSite.pages || "not specified"
  detailsWindowTablePotential.textContent = targetSite.usefor || "not specified"
  // console.log(targetSite)
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

detailsWindow.addEventListener('click', e => {
  if (e.target.className === 'details_window__container') toggledetailsWindow(null, false)
})

detailsWindowButton.onclick = toggledetailsWindow
