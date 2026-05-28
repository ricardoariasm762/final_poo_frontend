export interface MenuItem {
  id: number;
  label: string;
  route?: string | null;
  icon?: string | null;
  children: MenuItem[];
}

