import styled from "styled-components";
import LangSelect from "./LangSelect";
import IconBtn from "./IconBtn";
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';

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
    return (
        <StyledSettingsPanel className={visible ? 'is-visible' : ''}>
            <div className="bar">
                <IconBtn Icon={CloseIcon} callback={close} />
            </div>
            
            <LangSelect />
        </StyledSettingsPanel>)
}

export default SettingsPanel;