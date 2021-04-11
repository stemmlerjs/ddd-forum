
import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

export const renderWithRouter = (ui: any, { route = '/', pageName = 'Test page' } = {}) => {
  window.history.pushState({}, pageName, route)

  return render(ui, { wrapper: BrowserRouter })
}

