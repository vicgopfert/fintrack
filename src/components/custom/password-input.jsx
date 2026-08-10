import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

const PasswordInput = ({ placeholder = 'Digite sua senha', ...props }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        type={passwordIsVisible ? 'text' : 'password'}
        placeholder={placeholder}
        {...props}
      />

      <Button
        type="button"
        variant="ghost"
        className="absolute top-0 right-0 bottom-0 my-auto mr-1 h-8 w-8 text-muted-foreground"
        onClick={() => setPasswordIsVisible(!passwordIsVisible)}
      >
        {passwordIsVisible ? <EyeClosed /> : <Eye />}
      </Button>
    </div>
  );
};

export default PasswordInput;
