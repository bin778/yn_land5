'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {
  LazyReCaptchaContext,
  type ExecuteRecaptcha,
  type LazyReCaptchaInternalContextValue,
  useLazyReCaptchaInternal,
} from './lazyReCaptchaContext';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '6LcuaXksAAAAAOSrpx8wAyoehcx6cqkV5n98Xw9Y';

function RecaptchaBridge() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { registerExecuteRecaptcha } = useLazyReCaptchaInternal();

  useEffect(() => {
    if (executeRecaptcha) {
      registerExecuteRecaptcha(executeRecaptcha);
    }
  }, [executeRecaptcha, registerExecuteRecaptcha]);

  return null;
}

export function LazyReCaptchaProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [executeRecaptcha, setExecuteRecaptcha] = useState<ExecuteRecaptcha | undefined>();

  const activate = useCallback(() => {
    setIsActive(prev => prev || true);
  }, []);

  const registerExecuteRecaptcha = useCallback((fn: ExecuteRecaptcha) => {
    setExecuteRecaptcha(() => fn);
  }, []);

  const contextValue: LazyReCaptchaInternalContextValue = {
    activate,
    isActive,
    executeRecaptcha,
    registerExecuteRecaptcha,
  };

  return (
    <LazyReCaptchaContext.Provider value={contextValue}>
      {isActive && (
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
          <RecaptchaBridge />
        </GoogleReCaptchaProvider>
      )}
      {children}
    </LazyReCaptchaContext.Provider>
  );
}
