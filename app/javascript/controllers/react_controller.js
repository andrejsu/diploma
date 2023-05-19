import { Controller } from "@hotwired/stimulus"
import React from "react"
import { createRoot } from "react-dom/client"
import App from "../components/App"

export default class extends Controller {
  static values = {
    data: Object
  }

  connect() {
    const domNode = this.element
    const root = createRoot(domNode)

    root.render(<App data={this.dataValue} />)
  }
}
