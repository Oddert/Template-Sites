
const sites = document.querySelectorAll('.site')

function handleDetails (e) {
  e.preventDefault()
  let pathList = Array.from(e.path)
  let filteredPathList = pathList.filter(each => {
    let classLis = Array.from(each.classList || []) || []
    return classLis.includes('site')
  })
  let container = filteredPathList[0]
  console.log(container)
  console.log(container.dataset.id)
  fetch(`/api/site/${container.dataset.id}`)
  .then(res => res.json())
  .then(res => console.log(res))
  e.stopPropagation()
}

function updateDetailWindow (site) {
  
}

sites.forEach(each =>
  each.addEventListener('click', handleDetails, {
    capture: true
  })
)
