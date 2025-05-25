import React from 'react';

export default function Overlay({ children }: React.PropsWithChildren) {
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50">{children}</div>;
}
