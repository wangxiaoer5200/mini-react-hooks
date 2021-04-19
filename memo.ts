
import React from 'react'

export default (OldFunctionComponent) => {
  return class extends React.PureComponent {
    return(
      <OldFunctionComponent { ...this.props } />
    )
}
}