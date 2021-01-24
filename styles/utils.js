import { styles as responsiveStyles } from '@flbrt/styled';
import styled from 'styled-components';

const hiddenTemplate = (props) => ({ display: props.visible ? 'inherit' : 'none' });

// eslint-disable-next-line import/prefer-default-export
export const Hidden = styled.div`${responsiveStyles(hiddenTemplate)}`;
