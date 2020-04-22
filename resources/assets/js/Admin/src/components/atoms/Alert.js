import React from 'react'

export default class Alert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      context: 'content',
      title: '',
      content: '',
      footer: ''
    }
  }

  componentDidMount() {
    console.log(this.props.context)
    const { type, title, content, footer } = this.props.context
    this.setState({ type, title, content, footer })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.context === 'content' && (
          <div className="mx-auto">
            <div className="alert alert-success" role="alert">
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="alert-heading">{this.state.title}</h4>
              <p dangerouslySetInnerHTML={{ __html: this.state.content }} />
              {this.state.footer !== '' && (
                <React.Fragment>
                  <hr />
                  <p className="mb-0">{this.state.footer}</p>
                </React.Fragment>
              )}
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}
