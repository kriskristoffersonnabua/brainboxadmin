import React from 'react'
import { StyledHeader, HeroContainer, NavContainer } from './styles'
import { navigate } from '@reach/router'
import { Avatar, Tabs, Tab, Tooltip, Menu, MenuItem } from '@material-ui/core'
import {
	Group,
	Mood,
	ChromeReaderMode,
	SentimentSatisfied
} from '@material-ui/icons'
import { firebase } from '../../../App'

class Header extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			openMenu: false
		}
		this.avatarIcon = React.createRef()
	}

	tabChanged = (evt, value) => {
		if (value == 0) {
			navigate('/dashboard/tutors')
		} else if (value === 1) {
			navigate('/dashboard/services')
		}
	}

	handleOpenMenu = evt => {
		this.setState({ openMenu: true, anchorEl: evt.currentTarget })
	}

	handleCloseMenu = evt => {
		this.setState({ openMenu: false, anchorEl: null })
	}

	handleSignout = () => {
		firebase.auth().signOut()
	}

	render() {
		const { anchorEl, openMenu } = this.state

		return (
			<StyledHeader>
				<HeroContainer onClick={this.handleOpenMenu}>
					<Avatar color="primary">
						<SentimentSatisfied />
					</Avatar>
				</HeroContainer>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					open={openMenu}
					onClose={this.handleCloseMenu}>
					<MenuItem onClick={this.handleSignout}>Signout</MenuItem>
				</Menu>
				<NavContainer>
					<Tabs onChange={this.tabChanged}>
						<Tooltip title="Tutors">
							<Tab icon={<Group />} />
						</Tooltip>
						<Tooltip title="Services">
							<Tab icon={<ChromeReaderMode />} />
						</Tooltip>
					</Tabs>
				</NavContainer>
			</StyledHeader>
		)
	}
}

export default Header
