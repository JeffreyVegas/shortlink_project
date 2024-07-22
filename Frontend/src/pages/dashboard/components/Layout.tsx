function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col">
        <div className="border-b-2 border-slate-100 pt-4 px-4">
          <div className="container mx-auto">
            <span>links</span>
            <span className="ml-2">Analytics</span>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

export default Layout;
