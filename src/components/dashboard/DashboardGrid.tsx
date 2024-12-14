import { useNavigate } from 'react-router-dom';
import { dashboardTools } from '@/config/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function DashboardGrid() {
  const navigate = useNavigate();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {dashboardTools.map((tool) => {
        const Icon = tool.icon;
        return (
          <Card key={tool.title} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle>{tool.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{tool.description}</CardDescription>
              <Button 
                className="w-full group-hover:bg-primary/90"
                onClick={() => navigate(tool.path)}
              >
                Open {tool.title}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}