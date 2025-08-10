import React from 'react';
import { getAdminClient } from '../../lib/supabaseAdmin';
import { createPlayer, linkParent, unlinkParent } from '../actions';

export default async function PlayersPage() {
  const supabase = getAdminClient();
  const { data: players } = await supabase.from('players').select('id,first_name,last_name,team_id,created_at');
  const { data: teams } = await supabase.from('teams').select('id,name');
  const { data: links } = await supabase.from('parent_links').select('id,parent_id,player_id,relation');

  return (
    <div style={{ padding: 24, display: 'grid', gap: 16 }}>
      <h1>Players</h1>
      <form action={createPlayer} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 520 }}>
        <input name="first_name" placeholder="First name" required />
        <input name="last_name" placeholder="Last name" required />
        <input name="date_of_birth" type="date" placeholder="DOB" />
        <select name="team_id" required>
          {(teams ?? []).map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <button type="submit">Create</button>
      </form>

      <div style={{ display: 'grid', gap: 12 }}>
        {(players ?? []).map((p) => (
          <div key={p.id} style={{ border: '1px solid #e5e7eb', padding: 12, borderRadius: 8 }}>
            <div style={{ fontWeight: 700 }}>{p.first_name} {p.last_name}</div>
            <div style={{ color: '#6b7280' }}>Team: {teams?.find((t) => t.id === p.team_id)?.name ?? p.team_id}</div>
            <div style={{ marginTop: 8 }}>
              <strong>Parents</strong>
              <ul>
                {(links ?? []).filter((l) => l.player_id === p.id).map((l) => (
                  <li key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{l.parent_id} ({l.relation})</span>
                    <form action={unlinkParent}>
                      <input type="hidden" name="link_id" value={l.id} />
                      <button type="submit">Unlink</button>
                    </form>
                  </li>
                ))}
              </ul>
              <form action={linkParent} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input type="hidden" name="player_id" value={p.id} />
                <input name="parent_id" placeholder="Parent User ID" required />
                <input name="relation" placeholder="Relation" defaultValue="guardian" />
                <button type="submit">Link</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


