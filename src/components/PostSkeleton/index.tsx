import { Box, Card, Skeleton, CardContent } from "@mui/material"

export const PostSkeleton = () => {
  return (
    <Box>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} width='60%' />
            </Box>
          </Box>
        </CardContent>
        <Skeleton variant="rectangular" height={256} />
        <CardContent>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width='60%' />
        </CardContent>
      </Card>
    </Box>
  );
}