import React, { Component } from 'react'

const Loading = props => {
	return (
		<div
			style={{
				width: '100%',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
			<img
				style={{
					width: '260px',
					height: '260px'
				}}
				src={require('../../assets/bboxapplogo.png')}
			/>
			{!!props.text ? (
				<span
					style={{
						marginTop: '24px',
						fontSize: '14px'
					}}>
					{props.text}
				</span>
			) : null}
		</div>
	)
}

export default Loading
