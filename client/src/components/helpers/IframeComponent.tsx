import React from 'react';

type IframeComponentProps = {
  url: string;
};

const IframeComponent: React.FC<IframeComponentProps> = ({ url }) => {
  return (
    <iframe src={url} title="Iframe Example" width="100%" height="500px" />
  );
};

export default IframeComponent;