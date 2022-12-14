export interface MenuItem {
  id: number
  text: string
  onClick: { ($event: Event): void }
}
