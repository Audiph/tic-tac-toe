import React from 'react';
import { Card, CardContent } from './ui/card';

interface PlayerProps {
  description: string;
  icon: React.ReactElement;
}

const Player: React.FC<PlayerProps> = ({ description, icon }) => {
  return (
    <Card className="pt-6">
      <CardContent className="flex justify-center items-center gap-8">
        {description} {icon}
      </CardContent>
    </Card>
  );
};

export default Player;
