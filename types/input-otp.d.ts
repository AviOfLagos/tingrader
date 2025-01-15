declare module 'input-otp' {
  import * as React from 'react';

  interface Slot {
    char: string;
    hasFakeCaret: boolean;
    isActive: boolean;
  }

  interface OTPInputContextType {
    slots: Slot[];
  }

  export const OTPInput: React.FC<any>;
  export const OTPInputContext: React.Context<OTPInputContextType | null>;
}