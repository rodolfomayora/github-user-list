import React, { FC } from 'react';

type SecureLinkProps = {
  path: string
}

const SecureExternalLink: FC<SecureLinkProps> = ({ path }) => {
  return (
    <a href={path}
      target="_blank"
      rel="external noopener noreferrer"
      style={{ wordBreak: 'break-word' }}
    >
      {path}
    </a>
  )
}

export default SecureExternalLink;