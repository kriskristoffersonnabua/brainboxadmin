import styled, { css } from 'styled-components'

export const ServiceWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`

export const TableWrapper = styled.div`
	width: 90%;
	height: auto;
	flex: 1;
`

export const ScheduleFormWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: none;
	flex-direction: column;
	padding: 36px;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	position: absolute;
	top: 0px;
	left: 0px;
	background: rgba(0, 0, 0, 0.5);
	z-index: 1;
	${props => {
		if (props.open) {
			console.log('css props')
			console.log(props)
			return css`
				display: flex;
			`
		}
	}};
`

export const ScheduleFormContainer = styled.div`
	width: 700px;
	height: auto;
	padding: 24px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	background: #fff;
`
