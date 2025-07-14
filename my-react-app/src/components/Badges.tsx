import React from 'react';
import { useMockApp } from '../context/MockAppContext';
import { Box, Typography, Chip, Tooltip, Stack, Card, CardContent } from '@mui/material';

const Badges: React.FC = () => {
  const { badges } = useMockApp();
  if (!badges || badges.length === 0) return null;

  return (
    <Card sx={{ borderRadius: 3, mb: 4, boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}>
          Logros y Badges
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {badges.map(badge => (
            <Tooltip key={badge.id} title={badge.description} arrow>
              <Chip
                icon={<span style={{ fontSize: 22 }}>{badge.icon}</span>}
                label={badge.name}
                color={badge.achieved ? 'success' : 'default'}
                variant={badge.achieved ? 'filled' : 'outlined'}
                sx={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  opacity: badge.achieved ? 1 : 0.5,
                  px: 2,
                  py: 1,
                  mb: 1
                }}
              />
            </Tooltip>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Badges; 