export type DashboardView = 
  | 'home' 
  | 'meetings' 
  | 'chats' 
  | 'calendar' 
  | 'files' 
  | 'ai-workshop' 
  | 'settings';

export type DashboardViewParams = {
  view?: DashboardView;
};
