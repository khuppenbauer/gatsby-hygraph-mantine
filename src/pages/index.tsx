import React from 'react';
import Layout from '../components/Layout/Layout';
import PageFooter from '../components/Page/Footer';
import PageHeader from '../components/Page/Header';
import Container from '../components/Container/Container';

export default function HomePage() {
  return (
    <Layout>
      <PageHeader />
      <main>
        <Container />
      </main>
      <PageFooter />
    </Layout>
  );
}
