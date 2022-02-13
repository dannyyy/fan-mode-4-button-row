window.customCards = window.customCards || [];
window.customCards.push({
  type: "fan-mode-4-button-row",
  name: "fan mode 4+1 button row",
  description: "A plugin to display your fan controls in a 4+1 button row.",
  preview: false,
});

class CustomFanModeRow extends Polymer.Element {

	static get template() {
		return Polymer.html`
			<style is="custom-style" include="iron-flex iron-flex-alignment"></style>
			<style>
				:host {
					line-height: inherit;
				}
				.mode {
					margin-left: 2px;
					margin-right: 2px;
					background-color: #759aaa;
					border: 1px solid lightgrey; 
					border-radius: 4px;
					font-size: 10px !important;
					color: inherit;
					text-align: center;
					float: right !important;
					padding: 1px;
					cursor: pointer;
				}
				
				</style>
					<hui-generic-entity-row hass="[[hass]]" config="[[_config]]">
						<div class='horizontal justified layout' on-click="stopPropagation">
							<button
								class='mode'
								style='[[_leftColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]]'
								toggles name="[[_leftName]]"
								on-click='setMode'
								disabled='[[_leftState]]'>[[_leftText]]</button>
							<button
								class='mode'
								style='[[_midLeftColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]];[[_hideMidLeft]]'
								toggles name="[[_midLeftName]]"
								on-click='setMode'
								disabled='[[_midLeftState]]'>[[_midLeftText]]</button>
							<button
								class='mode'
								style='[[_midColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]];[[_hideMid]]'
								toggles name="[[_midName]]"
								on-click='setMode'
								disabled='[[_midState]]'>[[_midText]]</button>
							<button
								class='mode'
								style='[[_midRightColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]];[[_hideMidRight]]'
								toggles name="[[_midRightName]]"
								on-click='setMode'
								disabled='[[_midRightState]]'>[[_midRightText]]</button>
							<button
								class='mode'
								style='[[_rightColor]];min-width:[[_width]];max-width:[[_width]];height:[[_height]]'
								toggles name="[[_rightName]]"
								on-click='setMode'
								disabled='[[_rightState]]'>[[_rightText]]</button>
						</div>
					</hui-generic-entity-row>
		`;
    }

    static get properties() {
		return {
			hass: {
				type: Object,
				observer: 'hassChanged'
			},
				_config: Object,
				_stateObj: Object,
				_modeOff: String,
				_modeOne: String,
				_modeTwo: String,
				_modeThree: String,
				_modeFour: String,
				_width: String,
				_height: String,
				_leftColor: String,
				_midLeftColor: String,
				_midColor: String,
				_midRightColor: String,
				_rightColor: String,
				_leftText: String,
				_midLeftText: String,
				_midText: String,
				_midRightText: String,
				_rightText: String,
				_leftName: String,
				_midLeftName: String,
				_midName: String,
				_midRightName: String,
				_rightName: String,
				_leftState: Boolean,
				_midLeftState: Boolean,
				_midState: Boolean,
				_midRightState: Boolean,
				_rightState: Boolean,
				_hideMidLeft: Boolean,
				_hideMid: Boolean,
				_hideMidRight: Boolean,
		}
	}

	setConfig(config) {
		this._config = config;
		
		this._config = {
			customTheme: false,
			sendStateWithMode: false,
			reverseButtons: false,
			customModes: false,
			customText: false,
			twoModeFan: false,
			modeOff: "none",
			modeOne: "low",
			modeTwo: "medium",
			modeThree: "high",
			modeThree: "max",
			width: '30px',
			height: '30px',
			isOffColor: '#f44c09',
			isOnModeOneColor: '#43A047',
			isOnModeTwoColor: '#43A047',
			isOnModeThreeColor: '#43A047',
			isOnModeFourColor: '#43A047',
			buttonInactiveColor: '#759aaa',
			customOffText: 'OFF',
			customModeOneText: 'LOW',
			customModeTwoText: 'MED',
			customModeThreeText: 'HIGH',
			customModeFourText: 'MAX',
			...config
		};
	}

	hassChanged(hass) {

		const config = this._config;
		const stateObj = hass.states[config.entity];
		const custTheme = config.customTheme;
		const sendStateWithMode = config.sendStateWithMode;
		const revButtons = config.reverseButtons;
		const custModes = config.customModes;
		const custText = config.customText;
		const twoModes = config.twoModeFan;
		const buttonWidth = config.width;
		const buttonHeight = config.height;
		const onM1Clr = config.isOnModeOneColor;
		const onM2Clr = config.isOnModeTwoColor;
		const onM3Clr = config.isOnModeThreeColor;
		const onM4Clr = config.isOnModeFourColor;
		const offClr = config.isOffColor;
		const buttonOffClr = config.buttonInactiveColor;
		const mOff = config.modeOff;
		const m1 = config.modeOne;
		const m2 = config.modeTwo;
		const m3 = config.modeThree;
		const m4 = config.modeFour;
		const custOffTxt = config.customOffText;
		const custM1Txt = config.customModeOneText;
		const custM2Txt = config.customModeTwoText;
		const custM3Txt = config.customModeThreeText;
		const custM4Txt = config.customModeFourText;
						
		let offstate;
		let mode1;
		let mode2;
		let mode3;
		let mode4;
		
		if (custModes) {
			if (stateObj && stateObj.attributes) {
				if (stateObj.state == 'on' && stateObj.attributes.preset_mode == m1 ) {
					mode1 = 'on';
				} else if (stateObj.state == 'on' && stateObj.attributes.preset_mode == m2 ) {
					mode2 = 'on';
				} else if (stateObj.state == 'on' && stateObj.attributes.preset_mode == m3 ) {
					mode3 = 'on';
				} else if (stateObj.state == 'on' && stateObj.attributes.preset_mode == m4 ) {
					mode4 = 'on';
				} else {
					offstate = 'on';
				}	
			}
		} else {
			if (stateObj && stateObj.attributes) {
				if (stateObj.state == 'on' && stateObj.attributes.preset_mode == "low" ) {
					mode1 = 'on';
				} else if (stateObj.state == 'on' && stateObj.attributes.preset_mode == "medium" ) {
					mode2 = 'on';
				} else if (stateObj.state == 'on' && stateObj.attributes.preset_mode == "high" ) {
					mode3 = 'on';
				} else if (stateObj.state == 'on' && stateObj.attributes.preset_mode == "max" ) {
					mode4 = 'on';
				} else {
					offstate = 'on';
				}	
			}
		}
		
		let offtext;
		let m1text;
		let m2text;
		let m3text;
		let m4text;
		
		if (custText) {
			offtext = custOffTxt;
			m1text = custM1Txt;
			m2text = custM2Txt;
			m3text = custM3Txt;
			m4text = custM4Txt;
		} else if (custModes) {
			offtext = mOff;
			m1text = m1;
			m2text = m2;
			m3text = m3;
			m4text = m4;
		} else {
			offtext = "OFF";
			m1text = "LOW";
			m2text = "MED";
			m3text = "HIGH";
			m4text = "MAX";
		}
		
		let mode1color;
		let mode2color;
		let mode3color;
		let mode4color;
		let offcolor;

				
		if (custTheme) {
			if (mode1 == 'on') {
				mode1color = 'background-color:' + onM1Clr;
			} else {
				mode1color = 'background-color:' + buttonOffClr;
			}
			if (mode2 == 'on') {
				mode2color = 'background-color:'  + onM2Clr;
			} else {
				mode2color = 'background-color:' + buttonOffClr;
			}
			if (mode3 == 'on') {
				mode3color = 'background-color:'  + onM3Clr;
			} else {
				mode3color = 'background-color:' + buttonOffClr;
			}
			if (mode4 == 'on') {
				mode4color = 'background-color:'  + onM4Clr;
			} else {
				mode4color = 'background-color:' + buttonOffClr;
			}
			if (offstate == 'on') {
				offcolor = 'background-color:'  + offClr;
			} else {
				offcolor = 'background-color:' + buttonOffClr;
			}
		} else {
			if (mode1 == 'on') {
				mode1color = 'background-color: var(--switch-checked-color)';
			} else {
				mode1color = 'background-color: var(--switch-unchecked-color)';
			}
			if (mode2 == 'on') {
				mode2color = 'background-color: var(--switch-checked-color)';
			} else {
				mode2color = 'background-color: var(--switch-unchecked-color)';
			}
			if (mode3 == 'on') {
				mode3color = 'background-color: var(--switch-checked-color)';
			} else {
				mode3color = 'background-color: var(--switch-unchecked-color)';
			}
			if (mode4 == 'on') {
				mode4color = 'background-color: var(--switch-checked-color)';
			} else {
				mode4color = 'background-color: var(--switch-unchecked-color)';
			}
			if (offstate == 'on') {
				offcolor = 'background-color: var(--switch-checked-color)';
			} else {
				offcolor = 'background-color: var(--switch-unchecked-color)';
			}
		}
		
		let twomodes_left;
		let twomodes_mid;
		let twomodes_right;
		
		// Todo: For mid button
		if (twoModes) {
			if (revButtons) {
				twomodes_right = 'display:none';
				twomodes_left = 'display:block';
			} else {
				twomodes_left = 'display:none';
				twomodes_right = 'display:block';
			}
		} else {
			twomodes_left = 'display:block';
			twomodes_right = 'display:block';
		}

		let buttonwidth = buttonWidth;
		let buttonheight = buttonHeight;
		
		let offname = 'off'
		let m1name = 'mode1'
		let m2name = 'mode2'
		let m3name = 'mode3'
		let m4name = 'mode4'
		
		if (revButtons) {
			this.setProperties({
				_stateObj: stateObj,
				_leftState: offstate == 'on',
				_midLeftState: mode1 === 'on',
				_midState: mode2 === 'on',
				_midRightState: mode3 === 'on',
				_rightState: mode4 === 'on',
				_width: buttonwidth,
				_height: buttonheight,
				_leftColor: offcolor,
				_midLeftColor: mode1color,
				_midColor: mode2color,
				_midRightColor: mode3color,
				_rightColor: mode4color,
				_modeOff: mOff,
				_modeOne: m1,
				_modeTwo: m2,
				_modeThree: m3,
				_modeFour: m4,
				_leftText: offtext,
				_midLeftText: m1text,
				_midText: m2text,
				_midRightText: m3text,
				_rightText: m4text,
				_leftName: offname,
				_midLeftName: m1name,
				_midName: m2name,
				_midRightName: m3name,
				_rightName: m4name,
				_hideMidLeft: twomodes_left,
				_hideMid: twomodes_mid,
				_hideMidRight: twomodes_right,
			});
		} else {
			this.setProperties({
				_stateObj: stateObj,
				_leftState: mode4 == 'on',
				_midLeftState: mode3 === 'on',
				_midState: mode2 === 'on',
				_midRightState: mode1 === 'on',
				_rightState: offstate === 'on',
				_width: buttonwidth,
				_height: buttonheight,
				_leftColor: mode4color,
				_midLeftColor: mode3color,
				_midColor: mode2color,
				_midRightColor: mode1color,
				_rightColor: offcolor,
				_modeOff: mOff,
				_modeOne: m1,
				_modeTwo: m2,
				_modeThree: m3,
				_modeFour: m4,
				_leftText: m4text,
				_midLeftText: m3text,
				_midText: m2text,
				_midRightText: m1text,
				_rightText: offtext,
				_leftName: m4name,
				_midLeftName: m3name,
				_midName: m2name,
				_midRightName: m1name,
				_rightName: offname,
				_hideMidLeft: twomodes_left,
				_hideMid: twomodes_mid,
				_hideMidRight: twomodes_right,
			});
		}
				
		
	}

	stopPropagation(e) {
		e.stopPropagation();
	}
	
	setMode(e) {
		const mode = e.currentTarget.getAttribute('name');
		const param = {entity_id: this._config.entity};
		if(mode == 'off' ){
			this.hass.callService('fan', 'turn_off', param);
		} else {
			if (this._config.sendStateWithMode) {
				this.hass.callService('fan', 'turn_on', param);
			} if (mode == 'mode1') {
				param.preset_mode = this._modeOne;
				this.hass.callService('fan', 'set_preset_mode', param);
			} else if (mode == 'mode2') {
				param.preset_mode = this._modeTwo;
				this.hass.callService('fan', 'set_preset_mode', param);
			} else if (mode == 'mode3') {
				param.preset_mode = this._modeThree;
				this.hass.callService('fan', 'set_preset_mode', param);
			} else if (mode == 'mode4') {
				param.preset_mode = this._modeFour;
				this.hass.callService('fan', 'set_preset_mode', param);
			}
		}
	}
}
	
customElements.define('fan-mode-4-button-row', CustomFanModeRow);
