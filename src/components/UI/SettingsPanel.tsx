import styled from "styled-components";
import IconBtn from "./IconBtn";
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import RadioImage from "./RadioImage";
import themeClassic from '../../images/theme-classic.webp';
import themeMarioKart from '../../images/theme-mario-kart.webp';
import { useContext } from "react";
import AppContext from "../../store/app-context";
import SelectLang from "./SelectLang";

interface IStyledSettingsPanel {
    visible: boolean;
    close: () => void;
}

const StyledSettingsPanel = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100% + 40px);
    background-color: var(--blue-light);
    color: var(--white);
    padding: 0 var(--spacer) var(--spacer);
    transform: translateY(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 1;

    .bar {
        position: relative;
        display: flex;
        justify-content: flex-end;
        width: 100%;
        height: 40px;
        background-color: var(--blue-light);
        color: #fff;
        margin: 0 0 var(--spacer);
        padding: 0;
    }

    &.is-visible {
        transform: translateY(0);
    }
`

function SettingsPanel({ 
    visible = false,
    close
} : IStyledSettingsPanel) {
    const appCtx = useContext(AppContext);
    console.log(appCtx.theme)
    
    return (
        <StyledSettingsPanel className={visible ? 'is-visible' : ''}>
            <div className="bar">
                <IconBtn Icon={CloseIcon} callback={close} />
            </div>
            
            <SelectLang />

            <RadioImage 
                id="Classic" 
                img={themeClassic} 
                width="800" 
                height="250" 
                label={appCtx.getTranslation('themeClassic')}
                name="theme" 
                checked={appCtx.theme === 'Classic'}
                value="Classic"
                callback={(e: { target: { value: string; }; }) => appCtx.onToggleTheme(e.target.value)} />
            <RadioImage 
                id="MarioKart" 
                img={themeMarioKart} 
                width="800" 
                height="250" 
                label={appCtx.getTranslation('themeMarioKart')}
                name="theme" 
                checked={appCtx.theme === 'MarioKart'}
                value="MarioKart"
                callback={(e: { target: { value: string; }; }) => appCtx.onToggleTheme(e.target.value)} />
        </StyledSettingsPanel>)
}

export default SettingsPanel;