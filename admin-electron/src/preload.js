// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
window.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('clickThroughElement')
    el.addEventListener('mouseenter', () => {
        ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
    })
    el.addEventListener('mouseleave', () => {
        ipcRenderer.send('set-ignore-mouse-events', false)
    })
})