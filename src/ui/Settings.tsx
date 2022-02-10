import * as RadioGroup from '@radix-ui/react-radio-group';
import React, { FC } from 'react';
import styled from 'styled-components';
import { SettingsState } from 'utils/settings';
import { theme } from 'utils/theme';

const Container = styled.div`
  margin-bottom: auto;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  margin: 1rem 0;
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
  <Container>
    <Title>Asetukset</Title>
    <Setting>
      <Label id="only-native-keyboard-label">Näppäimistö ruudulla</Label>
      <RadioGroup.Root
        aria-labelledby="only-native-keyboard-label"
        name="only-native-keyboard"
        value={`${onlyNativeKeyboard}`}
        onValueChange={(v) => setOnlyNativeKeyboard(v === 'true')}
      >
        <StyledRadio value="false">
          <span>Kyllä</span>
          <StyledIndicator />
        </StyledRadio>
        <StyledRadio value="true">
          <span>Ei</span>
          <StyledIndicator />
        </StyledRadio>
      </RadioGroup.Root>
    </Setting>
  </Container>
);
