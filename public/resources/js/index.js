
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

const fullScreenImage             = document.querySelector('.fullScreenImage')
const fullScreenImageSrc          = fullScreenImage.querySelector('a img')
const fullScreenImageClose        = fullScreenImage.querySelector('.fullScreenImage__close')

let sites = []

console.log(window.location.search === undefined)

fetch(`/api/sites/${window.location.search}`)
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
  // detailsWindowImageLink.href             = targetSite.local ? targetSite.onsiteURL : targetSite.offsiteURL
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

  fullScreenImageSrc.src                  = targetSite.thumbnail || "https://static.umotive.com/img/product_image_thumbnail_placeholder.png"
  toggledetailsWindow (null, true)
}

function toggledetailsWindow (e, open=false) {
  if (open) detailsWindow.classList.remove('no_show')
  else detailsWindow.classList.add('no_show')
}

function toggleFullScreenImage (e, open=false) {
  if (open) fullScreenImage.classList.remove('no_show')
  else fullScreenImage.classList.add('no_show')
}

function toggleFullScreenUI (e, show=true) {
  if (show) fullScreenImageClose.classList.remove('view_hide')
  else fullScreenImageClose.classList.add('view_hide')
}

// ========== Bellow scrollable detection is very messy (needs debouncing) but does work for the now  ==========

function scrollDetection (e, site) {
  const parent = site.querySelector('.site__details')
  const child = site.querySelector('.site__details--container')
  // console.log(parent.scrollHeight, child.scrollHeight)
  if (parent.scrollHeight < child.scrollHeight) {
    // console.log('will scroll')
    parent.classList.add('scrollable')
  } else {
    // console.log('no scroll')
    parent.classList.remove('scrollable')
  }
  // console.log(parent)
}

allSites.forEach(each =>
  each.addEventListener('click', handleDetails, { capture: true })
)

let hovering = false

allSites.forEach(each => {
  each.addEventListener('mouseover', e => {
    e.stopPropagation()
    hovering = true
    // console.log(each)
    setTimeout(() => {
      if (hovering) scrollDetection(e, each)
    }, 500)
  }, {
    capture: true
  })
})

allSites.forEach(each => each.addEventListener('mouseout', () => hovering = false))

// allSites.forEach(each => each.addEventListener('mouseover', ahhhh))

detailsWindowImageLink.addEventListener('click', () => toggleFullScreenImage(null, true))
fullScreenImageClose.addEventListener('click', () => toggleFullScreenImage(null, false)) //() => console.log('wejkguilweerhrtktylotui;puo #ThanksGraham')
fullScreenImage.addEventListener('click', e => {
  if (e.target.className == 'fullScreenImage') toggleFullScreenImage(null, false)
})
fullScreenImage.addEventListener('mouseenter', () => toggleFullScreenUI(null, true))
fullScreenImage.addEventListener('mouseleave', () => toggleFullScreenUI(null, false))

detailsWindow.addEventListener('click', e => {
  if (e.target.className === 'details_window__container') toggledetailsWindow(null, false)
})

detailsWindowButton.onclick = toggledetailsWindow
