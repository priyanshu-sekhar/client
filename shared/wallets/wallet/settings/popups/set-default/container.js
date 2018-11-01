// @flow
import {namedConnect} from '../../../../../util/container'
import * as Constants from '../../../../../constants/wallets'
import * as Types from '../../../../../constants/types/wallets'
import * as WalletsGen from '../../../../../actions/wallets-gen'
import {anyWaiting} from '../../../../../constants/waiting'
import SetDefaultAccountPopup from '.'

const mapStateToProps = (state, {routeProps}) => {
  const accountID = routeProps.get('accountID')

  return {
    accountID,
    accountName: Constants.getAccount(state, accountID).name,
    username: state.config.username,
    waiting: anyWaiting(state, Constants.setAccountAsDefaultWaitingKey),
  }
}
const mapDispatchToProps = (dispatch, {navigateUp}) => ({
  _onClose: () => dispatch(navigateUp()),
  _onAccept: (accountID: Types.AccountID) =>
    dispatch(
      WalletsGen.createSetAccountAsDefault({
        accountID,
      })
    ),
})
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  accountName: stateProps.accountName,
  username: stateProps.username,
  waiting: stateProps.waiting,
  onClose: () => dispatchProps._onClose(),
  onAccept: () => dispatchProps._onAccept(stateProps.accountID),
})

export default namedConnect(mapStateToProps, mapDispatchToProps, mergeProps, 'SetDefaultAccountPopup')(
  SetDefaultAccountPopup
)
