import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';

interface PlayerProps {
  description: string;
  icon: React.ReactElement;
  playerScore: number | undefined;
  draws: number | undefined;
}

const Player: React.FC<PlayerProps> = ({
  description,
  icon,
  playerScore,
  draws,
}) => {
  return (
    <Card className="pt-6">
      <CardHeader>
        {description} {icon}
      </CardHeader>
      <CardContent className="flex justify-center items-center gap-6">
        <span>
          <strong>Wins: </strong>
          {playerScore || 0}
        </span>
        <span>
          <strong>Draws: </strong>
          {draws || 0}
        </span>
      </CardContent>
    </Card>
  );
};

export default Player;
