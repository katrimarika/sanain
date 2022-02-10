import React, { FC, Fragment } from 'react';
import styled from 'styled-components';
import { SettingsState } from 'utils/settings';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { theme } from 'utils/theme';

const Title = styled.h3`
  font-size: 1.25rem;
`;

const Setting = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StyledRadio = styled(RadioGroup.Item)`
  position: relative;
  background: transparent;
  border: 1px solid ${theme.colors.white};
  color: ${theme.colors.white};
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.highlight};
  }
`;

const StyledIndicator = styled(RadioGroup.Indicator)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;

  border: 3px solid ${theme.colors.highlight};
`;

export const Settings: FC<SettingsState> = ({
  onlyNativeKeyboard,
  setOnlyNativeKeyboard,
}) => (
  <Fragment>
    <Title>Asetukset</Title>
    <Setting>
      <Label id="only-native-keyboard-label">Näppäimistö</Label>
      <RadioGroup.Root
        aria-labelledby="only-native-keyboard-label"
        name="only-native-keyboard"
        value={`${onlyNativeKeyboard}`}
        onValueChange={(v) => setOnlyNativeKeyboard(v === 'true')}
      >
        <StyledRadio value="false">
          <span>Ruudulla</span>
          <StyledIndicator />
        </StyledRadio>
        <StyledRadio value="true">
          <span>Natiivi</span>
          <StyledIndicator />
        </StyledRadio>
      </RadioGroup.Root>
    </Setting>
  </Fragment>
);
